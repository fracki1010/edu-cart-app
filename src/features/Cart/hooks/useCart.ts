// src/features/Cart/hooks/useCart.ts
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
// Importamos tus acciones de Redux (asegúrate que existan en tu slice)
import {
  cartStart,
  cartSuccess,
  cartFailure,
  cartRemoveItem,
  clearCartState,
} from "../redux/cartSlice";
// Importamos tu API existente
import {
  getCart as getCartApi,
  addItemToCart as addItemApi,
  updateItemQuantity as updateItemApi,
  removeItemFromCart as removeItemApi,
  clearCart as clearCartApi,
} from "../services/apiCart"; // Asumiendo que renombraste el archivo o la importación
import type { IProduct } from "../../Products/types/Product";
import type { ICartItem } from "../types/Cart";

// Clave para localStorage
const GUEST_CART_KEY = "educart_guest_cart";

export function useCart() {
  const dispatch = useDispatch();

  // Obtenemos datos del usuario y del carrito desde Redux
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { items, total, loading, error } = useSelector((state: RootState) => state.cart);

  const fetchCart = useCallback(async () => {
    dispatch(cartStart());

    // --- ESCENARIO A: MODO INVITADO (Leer de LocalStorage) ---
    if (!user || !token) {
      const storedCart = localStorage.getItem(GUEST_CART_KEY);
      const guestItems: ICartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const guestTotal = guestItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      dispatch(cartSuccess({
        items: guestItems,
        total: guestTotal,
        id: 0,
        userId: 0
      }));
      return;
    }

    // --- ESCENARIO B: MODO CLIENTE (API) ---
    try {
      // ===> LÓGICA DE SINCRONIZACIÓN <===
      // Antes de pedir el carrito a la API, revisamos si hay algo "pendiente" en local
      const localCartJson = localStorage.getItem(GUEST_CART_KEY);

      if (localCartJson) {
        const localItems: ICartItem[] = JSON.parse(localCartJson);

        if (localItems.length > 0) {
          console.log("🔄 Sincronizando carrito local con la nube...", localItems);

          // Subimos cada item local al backend
          // Usamos Promise.all para hacerlo en paralelo (más rápido)
          await Promise.all(localItems.map(item =>
            addItemApi(user.id, item.productId)
              .catch(err => console.error(`Error sincronizando item ${item.name}:`, err))
          ));
        }

        // Una vez subido, borramos el carrito local para no duplicar en el futuro
        localStorage.removeItem(GUEST_CART_KEY);
      }

      // ===> FIN SINCRONIZACIÓN <===

      // Ahora sí, pedimos la "Verdad" al backend (que ya tendrá los items sumados)
      const data = await getCartApi();

      // Mapeo de respuesta API a estructura Redux
      const mappedItems = data.items.map((i: any) => ({
        cartId: data.id,
        productId: i.product.id || i.product_id, // Manejo defensivo de IDs
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        image_url: i.product.imageUrl || i.product.image_url || "https://placehold.co/100"
      }));

      const serverTotal = mappedItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

      dispatch(cartSuccess({
        items: mappedItems,
        total: serverTotal,
        id: data.id,
        userId: user.id
      }));

    } catch (err) {
      console.error(err);
      dispatch(cartFailure("Error al cargar el carrito del servidor"));
    }
  }, [user, token, dispatch]); // Dependencias críticas

  // --- Helper para guardar en localStorage (Solo Invitados) ---
  const saveLocalCart = (newItems: ICartItem[]) => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(newItems));
    const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    dispatch(cartSuccess({ items: newItems, total: newTotal, id: 0, userId: 0 }));
  };

  // --- 2. AGREGAR ITEM (Add) ---
  const addItem = async (product: IProduct, quantity: number = 1) => {
    dispatch(cartStart());

    // MODO INVITADO
    if (!user) {
      const existingItem = items.find((i) => i.productId === product.id);
      let newItems = [...items];

      if (existingItem) {
        // Si ya existe, sumamos cantidad
        newItems = newItems.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        // Si es nuevo, lo creamos. IMPORTANTE: Mapear IProduct a ICartItem
        const newItem: ICartItem = {
          cartId: 0,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image_url: product.imageUrl || "", // Asegurar que exista imagen
        };
        newItems.push(newItem);
      }
      saveLocalCart(newItems);
      return;
    }

    // MODO CLIENTE (API)
    try {
      // Tu API requiere userId, productId, quantity
      await addItemApi(product.id, quantity);
      // Recargamos el carrito desde el servidor para tener la info fresca
      await fetchCart();
    } catch (err) {
      dispatch(cartFailure("Error al agregar producto"));
    }
  };

  // --- 3. ACTUALIZAR CANTIDAD (Update) ---
  const updateItem = async (productId: number, quantity: number) => {
    dispatch(cartStart());

    // MODO INVITADO
    if (!user) {
      console.log("Actualizando local:", productId, quantity); // DEBUG

      // Usamos map para crear un NUEVO array (inmutabilidad)
      const newItems = items.map((i) => {
        // Aseguramos que la comparación sea segura (ambos a String o ambos Number)
        if (Number(i.productId) === Number(productId)) {
          return { ...i, quantity: quantity };
        }
        return i;
      });

      saveLocalCart(newItems);
      return;
    }

    // MODO CLIENTE
    try {
      await updateItemApi(productId, quantity);
      await fetchCart();
    } catch (err) {
      dispatch(cartFailure("Error al actualizar cantidad"));
    }
  };

  // --- 4. ELIMINAR ITEM (Remove) ---
  const removeItem = async (productId: number) => {
    dispatch(cartStart());

    // MODO INVITADO
    if (!user) {
      const newItems = items.filter((i) => i.productId !== productId);
      saveLocalCart(newItems);
      return;
    }

    // MODO CLIENTE
    try {
      // OJO: Tu API removeItemFromCart pide (userId, itemId).
      // A veces el itemId es el ID de la fila en la tabla intermedia, no el productId.
      // Si tu backend usa productId para borrar, está bien. Si usa un ID de relación,
      // necesitas buscar ese ID en 'items' primero.

      // Asumiendo que tu backend es inteligente y acepta productId O buscas el item correcto:
      // const cartItem = items.find(i => i.productId === productId);
      // if (!cartItem) return;

      await removeItemApi(productId); // O cartItem.id si fuera necesario
      await fetchCart();
    } catch (err) {
      dispatch(cartFailure("Error al eliminar producto"));
    }
  };

  // --- 5. VACIAR CARRITO (Para después de comprar) ---
  const emptyCart = async () => {
    dispatch(cartStart());

    // Si es invitado, solo borramos local
    if (!user) {
      localStorage.removeItem(GUEST_CART_KEY);
      dispatch(cartSuccess({ items: [], total: 0, id: 0, userId: 0 }));
      return;
    }

    // Si es cliente, no tenemos endpoint de "vaciar todo" en la API que me pasaste,
    // pero podemos limpiar el estado local y asumir que al comprar se vacía en backend (lógica de orden)
    // O si tu API tuviera endpoint DELETE /cart, lo usaríamos aquí.

    // Para efectos de UI inmediata:
    dispatch(cartSuccess({ items: [], total: 0, id: 0, userId: user.id }));
  };

  // EFECTO PRINCIPAL: Se dispara al cambiar el usuario (Login/Logout)
  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // fetchCart ya depende de [user] gracias al useCallback

  // Efecto para cargar el carrito al iniciar o cambiar de usuario
  useEffect(() => {
    fetchCart();
  }, [user, token]); // Se ejecuta cuando cambia el usuario (login/logout)

  return {
    items,
    total,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    fetchCart,
    emptyCart,
  };
}