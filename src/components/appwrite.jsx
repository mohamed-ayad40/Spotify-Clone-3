import { Client, Account } from "appwrite";
const client = new Client()
                            .setEndpoint("https://cloud.appwrite.io/v1")
                            .setProject("66b29aeb002ff685ecae");

const account = new Account(client);
export {account, client};