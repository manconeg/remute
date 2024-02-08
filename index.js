export class Editable {
	constructor(original) {
    let object = Object.assign(this, original)
		return new Proxy(object, Editable.getHandler(this, original))
	}
  
  static getHandler(input, original) {
    let props = {}
    let commit = () => {
        let newObject = Object.assign({}, original)

        Object.keys(props)
              .forEach(key => {
                if ((typeof props[key] == "object") && (props[key] instanceof Editable))
                  newObject[key] = props[key].commit()
                else
                  newObject[key] = props[key]
                delete props[key]
              })

        return newObject
    }
    input.commit = () => commit()
    return {
      get(object, key, proxy) {
        if (object[key] === input.commit)
          return object[key]

        console.debug(`getting ${key} - ${typeof object[key]}`)

        if (!props[key])
          props[key] = this.createSafeInstance(object[key])

        return props[key]
      },
      set(object, key, value, proxy) {
        console.debug(`setting ${key}`)
        props[key] = this.createSafeInstance(value)
      },
      createSafeInstance(input) {
        return typeof input == "object" ? new Editable(input) : input
      }
    }
  }
}
