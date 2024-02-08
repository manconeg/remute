# remute

```
let object = {
   key: {
     super: "original"
   }
}

let editableObject = new Editable(object)
let key = editableObject.key
key.field = {newField: "newValue"}
let newObject = editableObject.commit()
console.log(object) // { key: { super: "original" } }
console.log(newObject) // { key: { field: { newField: "newValue" }, super: "original" } }
```
