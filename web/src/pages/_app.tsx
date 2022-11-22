import '../styles/global.css';
import { AppWrapper } from '../context/AppContext';
import { IAppProps } from '../interfaces/IProps/IAppProps';

function MyApp({ Component, pageProps }: IAppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
