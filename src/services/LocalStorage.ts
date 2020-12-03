
class LocalStorage {

  getItemFromStorage(name: string) {
    try {
      const retrievedItem = localStorage.getItem(name)
      // console.log('got item from local storage:', retrievedItem)
      return retrievedItem;
    }
    catch (error: any) {
      console.log(`error getting ${name} from local storage: ${error.toString()}`)
      return false;
    }
  }

  setItemInStorage(name: string, value: any) {
    try {
      localStorage.setItem(name, JSON.stringify(value))
      return true;
    }
    catch (error: any) {
      console.log(`error setting ${name} in local storage: ${error.toString()}`)
      return false;
    }
  }

  removeItemFromStorage(name: string) {
    try {
      localStorage.removeitem(name)
      return true;
    }
    catch (error: any) {
      console.log(`error setting ${name} in local storage: ${error.toString()}`)
      return false;
    }
  }
}

export default LocalStorage;
