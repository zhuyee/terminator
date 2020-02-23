import Vue from 'vue'
import Vuex from 'vuex'
import anime from 'animejs'
import Edge from '../../model/edges'

Vue.use(Vuex)

export const ScreenMutations = {
  SET_VIEW: 'SET_VIEW[设置视图对象]',
  ADD_WIDGET: 'ADD_WIDGET[添加部件]',
  REMOVE_WIDGET: 'REMOVE_WIDGET[添加部件]',
  ACTIVATION_WIDGET: 'ACTIVATION_WIDGET[设置激活的部件]',
  MODIFY_TOPOLOGY_EDITABLE_STATUS: 'MODIFY_TOPOLOGY_EDITABLE_STATUS[修改拓扑图可编辑状态]',
  ACTIVATION_NODE: 'ACTIVATION_NODE[设置激活的节点]',
  ACTIVATION_EDGE: 'ACTIVATION_EDGE[设置激活的边]',
  RESET_TOPOLOGY_STATE: 'RESET_TOPOLOGY_STATE[重置拓扑状态]',
  SET_EDGE_CONFIG: 'SET_EDGE_CONFIG[设置边配置]',
  UPDATE_TOPOLOGY_NODE_CONFIG: 'UPDATE_TOPOLOGY_NODE_CONFIG[更新拓扑节点配置]'
}

export default {
  namespaced: true,
  state: {
    // 视图对象
    view: null,
    // 视图中所有部件对象
    widgets: [],
    // 激活的部件对象，作为可读属性使用，不可通过非mutation方式进行修改
    activeWidget: null,
    // 拓扑图是否可编辑
    topologyEditable: false,
    // 拓扑图是否可更改尺寸
    topologyResizable: true,
    // 激活的拓扑节点
    activeNode: null,
    // 激活的拓扑边
    activeEdge: null,
    // 边配置
    edgeConfig: new Edge({})
  },
  getters: {
    // 画板缩放比例
    scale (state) {
      return state.view.scale || 1
    }
  },
  mutations: {
    // 设置视图对象
    [ScreenMutations.SET_VIEW] (state, payload) {
      state.view = payload.view
    },
    // 向视图部件库中添加部件
    [ScreenMutations.ADD_WIDGET] (state, payload) {
      state.widgets.push(payload.widget)
    },
    // 从视图部件库中移除该部件
    [ScreenMutations.REMOVE_WIDGET] (state, payload) {
      state.widgets = state.widgets.filter(widget => widget.widgetId !== payload.widgetId)
      // 置空激活部件
      state.activeWidget = null
      // 隐藏选择器
      anime.set(document.getElementById('wrapper'), {
        display: 'none'
      })
    },
    // 设置激活的部件，并修改widgets中的部件，深度复制激活部件，保留render对象
    [ScreenMutations.ACTIVATION_WIDGET] (state, payload) {
      state.activeWidget = payload.widget
      // 如果选择的是部件，则更新部件的配置
      if (payload.widget && payload.widget.widgetId) {
        const activeWidget = state.widgets.find(
          widget => widget.widgetId === payload.widget.widgetId
        )
        Object.assign(activeWidget, payload.widget)
      }
    },
    // 修改拓扑图可编辑状态
    [ScreenMutations.MODIFY_TOPOLOGY_EDITABLE_STATUS] (state, payload) {
      state.topologyEditable = payload.editable
    },
    // 设置激活的拓扑节点
    [ScreenMutations.ACTIVATION_NODE] (state, payload) {
      state.activeNode = payload.activeNode
      // 同步配置
      if (state.activeWidget) {
        const { render, config } = state.activeWidget
        render && render.save && render.save(config)
      }
    },
    // 更新拓扑节点配置
    [ScreenMutations.UPDATE_TOPOLOGY_NODE_CONFIG] (state) {
      if (state.activeWidget) {
        const { render, config } = state.activeWidget
        render && render.save && render.save(config)
      }
    },
    // 设置激活的拓扑边
    [ScreenMutations.ACTIVATION_EDGE] (state, payload) {
      state.activeEdge = payload.activeEdge
    },
    // 重置拓扑状态
    [ScreenMutations.RESET_TOPOLOGY_STATE] (state) {
      Object.assign(state, {
        activeNode: null,
        activeEdge: null,
        edgeConfig: new Edge({})
      })
    },
    // 设置边配置
    [ScreenMutations.SET_EDGE_CONFIG] (state, payload) {
      state.edgeConfig = payload.edgeConfig
    }
  },
  actions: {
  },
  modules: {
  }
}
