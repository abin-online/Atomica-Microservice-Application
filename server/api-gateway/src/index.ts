import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'

const app = express()

const {
    PORT,
    AUTH_SERVICE,
    TEST_SERVICE,
    PROBLEM_SERVICE,
    BADGE_SERVICE,
    COMPILER_SERVICE,
    COLLABORATION_SERVICE,
    COMMUNITY_SERVICE,
    CONTEST_SERVICE,
    SECURITY_NUMBER,
    COMMAND
} = process.env

// const services = [{
//     path: AUTH_SERVICE,
//     route: '/auth'
// }, {
//     path: TEST_SERVICE,
//     route: '/test'
// }, {
//     path: PROBLEM_SERVICE,
//     route: '/problem'
// }, {
//     path: BADGE_SERVICE,
//     route: '/badge'
// }, {
//     path: COMPILER_SERVICE,
//     route: '/compiler'
// }, {
//     path: COLLABORATION_SERVICE,
//     route: '/collaboration'
// },
// {
//     path: COMMUNITY_SERVICE,
//     route: '/api/community'
// }, {
//     path: CONTEST_SERVICE,
//     route: '/contest'
// }
// ]

//LOGGING 
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log(`LOGGING 📝 : ${req.method} request to: ${req.originalUrl}`);
    next();
});

const BOOLEAN = 1 + 2 == Number(SECURITY_NUMBER)

// services.forEach((service) => {
//     const isCollaboration = service.route === '/collaboration'
//     app.use(service?.route, createProxyMiddleware({
//         target: service?.path,
//         changeOrigin: true,
//         ws: isCollaboration
//     }))
// })

// services.forEach((service) => {
//     if (service.path) {
//         app.use(service.route, createProxyMiddleware({
//             target: service.path,
//             changeOrigin: true,  // Set this to true always
//             ws: service.route === '/collaboration'
//         }))
//     }
// });


if (AUTH_SERVICE) {
    app.use('/auth', createProxyMiddleware({
      target: AUTH_SERVICE,
      changeOrigin: true
    }));
  }
  
//   if (TEST_SERVICE) {
//     app.use('/test', createProxyMiddleware({
//       target: TEST_SERVICE,
//       changeOrigin: true
//     }));
//   }
  
app.use('/test', createProxyMiddleware({
    target: TEST_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      '^/test': '/test'  // Ensure the `/test` prefix remains in the forwarded request.
    },
  }));



  
  if (PROBLEM_SERVICE) {
    app.use('/problem', createProxyMiddleware({
      target: PROBLEM_SERVICE,
      changeOrigin: true
    }));
  }
  
  if (BADGE_SERVICE) {
    app.use('/badge', createProxyMiddleware({
      target: BADGE_SERVICE,
      changeOrigin: true
    }));
  }else{
    console.log('nOT founD' , BADGE_SERVICE)
  }
  
  if (COMPILER_SERVICE) {
    app.use('/compiler', createProxyMiddleware({
      target: COMPILER_SERVICE,
      changeOrigin: true
    }));
  }
  
  if (COLLABORATION_SERVICE) {
    app.use('/collaboration', createProxyMiddleware({
      target: COLLABORATION_SERVICE,
      changeOrigin: true,
      ws: true  // WebSocket support
    }));
  }
  
  if (COMMUNITY_SERVICE) {
    app.use('/api/community', createProxyMiddleware({
      target: COMMUNITY_SERVICE,
      changeOrigin: true
    }));
  }
  
  if (CONTEST_SERVICE) {
    app.use('/contest', createProxyMiddleware({
      target: CONTEST_SERVICE,
      changeOrigin: true
    }));
  }




app.use(
    "/",
    createProxyMiddleware({
        target: "http://frontend-srv:3000",
        changeOrigin: true,
    })
);

app.get('/', (req, res) => {
    res.json(COMMAND)
})


// app.get('/services', (req, res) => {
//     res.json(
//         services
//     )
// })

app.listen(PORT, () => {
    console.log(`ATOMICA RUNNING ON http://localhost:${PORT} 🍃`);
})
