import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: 'AIzaSyD2fPXbneNop5MyvRNUzVsNRt_LMG9wYdw',
    authDomain: 'project-3863732348337094717.firebaseapp.com',
    databaseURL: 'https://project-3863732348337094717.firebaseio.com',
    projectId: 'project-3863732348337094717',
    storageBucket: 'project-3863732348337094717.appspot.com',
    messagingSenderId: '803830854989',
    appId: '1:803830854989:web:12bae092694f49153ff304',
}

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.database()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        await this.db.ref(`users/${this.auth.currentUser.uid}`).set({login: email, best: 0})
    }

    addQuote(quote) {
        if (!this.auth.currentUser) {
            return alert('Not authorized')
        }

        return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
            quote,
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    async getBestUserScore() {
        return await this.db.ref('/users').once('value')
            .then(res => {
                const users = res.val()
                const best = Object.values(users).find(u => u.login === this.auth.currentUser.email).best
                localStorage.setItem('best', best)
            })
    }

    setBestUserScore(best) {
        return this.db.ref(`users/${this.auth.currentUser.uid}`)
            .set({login: this.auth.currentUser.email, best})
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    async getCurrentUserQuote() {
        const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
        return quote.get('quote')
    }
}

export default new Firebase()
