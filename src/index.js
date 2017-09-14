import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

import App from './app.js';
import Home from './route/home.js';
// import CommonCouponConf from './route/commonCouponConf.js';
import CommonCouponConf from './route/test.js';
import ModifyCoupon from './route/modifyCoupon.js';

console.log(typeof(CommonCouponConf))

ReactDOM.render( 
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path='common_coupon_conf' component={CommonCouponConf} />
                <Route path='modifyCoupon' component={ModifyCoupon} />
            </Route>
        </Router>
    
    , document.getElementById('root'));
registerServiceWorker();