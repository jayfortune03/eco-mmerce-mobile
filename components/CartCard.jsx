import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { fetchCart, removeQty, addQty, checkOut } from "../store";

const windowWidth = Dimensions.get("window").width;

export default function CartCard() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCart().then((data) => {
      setCarts(data);
    });
  }, []);

  const getTotalPrice = (products) => {
    let totalPrice = products.Product.qty * products.Product.price;

    return `Rp ${totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} , 00`;
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {carts.map((cart) => {
          return (
            <View style={styles.container} key={cart.Product.id}>
              <Image
                source={{ uri: cart.Product.picture }}
                style={styles.productImage}
              />
              <View style={{ paddingLeft: 8 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {cart.Product.name}
                </Text>
                <Text style={{ color: "grey" }}>
                  Rp
                  {cart.Product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  , 00
                </Text>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Text
                    style={{
                      color: "#20a869",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Total: {getTotalPrice(cart)}
                  </Text>
                </View>
              </View>
              <View style={styles.qtyContainer}>
                <TouchableHighlight
                  underlayColor={"#bfbfbf80"}
                  style={{
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    removeQty(cart.Product.id)
                      .then(() => {
                        return fetchCart();
                      })
                      .then((carts) => {
                        setCarts(carts);
                      });
                  }}
                >
                  <Text
                    style={{
                      color: "#20a869",
                      fontWeight: "bold",
                      fontSize: 20,
                      paddingHorizontal: 6,
                    }}
                  >
                    -
                  </Text>
                </TouchableHighlight>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    textAlign: "center",
                    borderRadius: 4,
                    color: "#888",
                  }}
                >
                  {cart.Product.qty}
                </Text>
                <TouchableHighlight
                  underlayColor={"#bfbfbf80"}
                  style={{
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    addQty(cart.Product.id)
                      .then(() => {
                        return fetchCart();
                      })
                      .then((carts) => {
                        setCarts(carts);
                      });
                  }}
                >
                  <Text
                    style={{
                      color: "#20a869",
                      fontWeight: "bold",
                      fontSize: 20,
                      paddingHorizontal: 6,
                    }}
                  >
                    +
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          );
        })}
      </View>
      <TouchableHighlight
        underlayColor={"#bfbfbf80"}
        style={{
          borderRadius: 4,
          backgroundColor: "#0eb511",
          marginVertical: 20,
        }}
        onPress={() =>
          checkOut()
            .then(() => {
              return fetchCart();
            })
            .then((carts) => {
              setCarts(carts);
            })
        }
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            padding: 8,
          }}
        >
          Checkout
        </Text>
      </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#f0fffb",
    position: "relative",
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 6,
    bottom: 6,
  },
  productImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 12,
  },
});
