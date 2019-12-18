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
}

export default new Firebase()
