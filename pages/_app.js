// Importação dos CSS
import '../styles/globals.css'
import '../styles/custom.css'
import '../styles/capitulos.css'

//Impotação do Framework Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css'

//Importação dos Icones
import '@fortawesome/fontawesome-free/css/all.min.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
