import Trie from './Trie'

class AutoComplete {
    constructor(data) {
        this.trie = new Trie()
        data.forEach(word => {
            this.trie.insert(word)
        });
    }

    suggest(word) {
        return this.trie.find(word)
    }
}

export default AutoComplete