class RequestStack {
    static instance = new RequestStack()

    arrayTo2DArray2 = (list, howMany) => {
        var idx = 0
        result = []
      
        while (idx < list.length) {
          if (idx % howMany === 0) result.push([])
          result[result.length - 1].push(list[idx++])
        }
      
        return result
    }
}

export default RequestStack;