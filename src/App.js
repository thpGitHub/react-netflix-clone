// import {ThemeProvider} from '@mui/styles'
import NetflixApp from './components/NetflixApp'

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    background: '#111',
//   palette: {
//     primary: {
//       main: red[500],
//     },
//   },
});


// const theme = {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// }

function App() {
    return (
        <ThemeProvider theme={theme}>
            <NetflixApp />
        </ThemeProvider>
    )
}

export default App
// export {App}
