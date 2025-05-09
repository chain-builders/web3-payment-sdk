# Paytron Stablecoin Payment Widget

The Paytron Stablecoin Payment Widget allows you to easily integrate stablecoin payments (e.g., USDT, USDC) into your application. This widget is designed to provide a seamless and secure payment experience for your users.

---

## Features

- **Multi-Currency Support**: Accept payments in USDT and USDC.
- **Easy Integration**: Add the widget to your application with minimal setup.
- **Secure Transactions**: Built with blockchain security in mind.
- **Customizable UI**: Match the widget's design to your application's branding.

---

## Getting Started

### Installation

To get started, install the required dependency:

\`\`\`bash
npm install paytron-react
\`\`\`

---

### Basic Usage

Here’s how to integrate the widget into your application:

\`\`\`tsx
import React from "react";
import { PaytronWidget } from "paytron-react";

const App = () => {
  return (
    <div>
      <h1>Pay with Stablecoins</h1>
      <PaytronWidget
        apiKey="your-api-key"
        currency="USDT"
        amount={100} // Amount in smallest unit (e.g., 100 = 1 USDT)
        onSuccess={(transaction) => console.log("Payment Successful:", transaction)}
        onError={(error) => console.error("Payment Error:", error)}
      />
    </div>
  );
};

export default App;
\`\`\`

---

## Configuration Options

The widget supports the following configuration options:

| Option       | Type     | Description                                                                 |
|--------------|----------|-----------------------------------------------------------------------------|
| \`apiKey\`    | \`string\` | Your API key for authenticating requests.                                  |
| \`currency\`  | \`string\` | The currency to accept payments in (e.g., \`USDT\`, \`USDC\`).             |
| \`amount\`    | \`number\` | The payment amount in the smallest unit (e.g., 100 = 1 USDT).              |
| \`onSuccess\` | \`function\` | Callback function triggered when a payment is successful.                |
| \`onError\`   | \`function\` | Callback function triggered when there is an error during the payment.    |

---

## Example: Customizing the Widget

You can customize the widget's appearance and behavior:

\`\`\`tsx
<PaytronWidget
  apiKey="your-api-key"
  currency="USDC"
  amount={500} // 5 USDC
  theme={{
    primaryColor: "#4A90E2",
    secondaryColor: "#FFFFFF",
    fontFamily: "Arial, sans-serif",
  }}
  onSuccess={(transaction) => alert("Payment Successful!")}
  onError={(error) => alert("Payment Failed!")}
  metadata={{
    orderId: "12345",
    customerEmail: "customer@example.com",
  }}
/>
\`\`\`

---

## Handling Transactions

When a payment is successful, the \`onSuccess\` callback provides a transaction object:

\`\`\`json
{
  "transactionId": "abc123",
  "amount": 100,
  "currency": "USDT",
  "status": "success",
  "timestamp": "2025-05-09T12:00:00Z"
}
\`\`\`

You can use this data to update your backend or display a confirmation to the user.

---

## Error Handling

If an error occurs during the payment process, the \`onError\` callback provides an error object:

\`\`\`json
{
  "code": "PAYMENT_FAILED",
  "message": "Insufficient funds",
  "details": {}
}
\`\`\`

---

## FAQ

### What currencies are supported?
Currently, the widget supports USDT and USDC.

### Can I customize the widget's design?
Yes, you can customize the widget's colors, fonts, and more using the \`theme\` property.

### Is the widget secure?
Yes, the widget is built with blockchain security standards to ensure safe transactions.

---

## Support

If you have any questions or need help, please contact our support team at [support@paytron.com](mailto:support@paytron.com).

---
