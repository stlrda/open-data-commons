
class LocalStorage {

  getItemFromStorage(name: string) {
    try {
      const retrievedItem = localStorage.getItem(name)
      console.log('got item:', retrievedItem)
      return retrievedItem;
    }
    catch (error: any) {
      console.log(`error getting ${name} from local storage: ${error.toString()}`)
    }
  }

  setItemInStorage(name: string, value: any) {
    try {
      localStorage.setItem(name, JSON.stringify(value))
    }
    catch (error: any) {
      console.log(`error setting ${name} in local storage: ${error.toString()}`)
    }
  }
}

export default LocalStorage;
