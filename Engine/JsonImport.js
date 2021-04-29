export default function ImportJson(url, get){
    fetch(url).then((value) => {
        if(value.ok){
            value.json().then(json => {
                get(json)
            }).catch(reason => {
                throw new Error(reason)
            })
        }
    }).catch((reason) => {
        throw new Error(reason)
    })
}