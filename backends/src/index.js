import dva from 'dva';
import App from '@/containers/App'
import login from '@/store/login'

const app = dva();
app.model(login)
app.router(App);
app.start('#root');
