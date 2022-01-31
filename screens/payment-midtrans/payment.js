import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from 'react-native-webview';
import axios from "axios";

const Payment = ({ route }) => {
  const [message, setMessage] = useState()
  const [token, setToken] = useState()

  const client_key = 'SB-Mid-client-sfxcXpvK6KWmD3ck'
  const midtrans_html = `<html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script type="text/javascript"
                  src="https://app.sandbox.midtrans.com/snap/snap.js"
                  data-client-key=${client_key}></script>
        </head>
        <body>
          <button id="pay-button">Pay!</button>
          <script type="text/javascript">
            var payButton = document.getElementById('pay-button');
            payButton.addEventListener('click', function () {
              snap.pay(${token}, {
                onSuccess: function(result){console.log('success');console.log(result);},
                onPending: function(result){window.ReactNativeWebView.postMessage(result);},
                onError: function(result){window.ReactNativeWebView.postMessage(result);},
                onClose: function(){console.log('customer closed the popup without finishing the payment');}
              })
            });
          </script>
        </body>
      </html>`

  useEffect(() => {
      const fetchData = async () => {
        await axios.get(`http://66.42.49.240/api/payment/get-token`).then((response) => {
          setToken(response.data.redirect_url)
          console.log(response.data);
        })
          .catch(error => {
            console.log(error)
          });
      }
      fetchData()
  }, [])
  return (
    <WebView
      style={styles.container}
      // source={{ html: midtrans_html }}
      source={{ uri: token}}
      onMessage={(event) => console.log(event.nativeEvent.data)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Payment;