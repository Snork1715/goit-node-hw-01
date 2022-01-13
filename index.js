const { program } = require("commander");
const contactsOperations = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

//invokeAction({ action: "list" });
//invokeAction({ action: "get", id: "47" });
// invokeAction({
//   action: "add",
//   name: "Joe Satriani",
//   email: "Satriani@gmail.com",
//   phone: "(699) 552-2316",
// });
//invokeAction({ action: "remove", id: "d16942b0-748d-11ec-ad85-797b24fa8d32" });
invokeAction(argv);
