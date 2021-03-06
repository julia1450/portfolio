import Vue from "vue"
import VueRouter from "vue-router"
import { store } from "@/store/store.js"

Vue.use(VueRouter)

const baseURL = process.env.NODE_ENV === "production" ? "/portfolio/" : "/"
const routes = [
	{
		path: `${baseURL}`,
		component: () => import("@/components/layout/BasicLayout"),
		meta: { title: "HyeVlog" },
		children: [
			{
				path: "",
				component: () => import("@/views/MainPage"),
				meta: { title: "HyeVlog" },
			},
			{
				path: "works",
				component: () => import("@/components/works/WorkList"),
				meta: { title: "작업물 목록" },
			},
		],
	},
	{
		path: `${baseURL}login`,
		component: () => import("@/views/LoginPage"),
		meta: {
			title: "관리자 인증하기",
		},
	},
	{
		path: `${baseURL}admin`,
		component: () => import("@/views/AdminPage"),
		meta: {
			title: "관리자 페이지",
			auth: true,
		},
	},
]

const router = new VueRouter({
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes: routes,
})
router.beforeEach((to, from, next) => {
	if (!to.meta.auth) {
		next()
	} else if (to.meta.auth && !store.state.isLogin) {
		router.replace("/login")
	}
})
router.afterEach(to => {
	document.title = to.meta.title || "HyeVlog"
})

export default router
