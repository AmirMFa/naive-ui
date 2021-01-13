import {
  Fragment,
  h,
  ref,
  Teleport,
  defineComponent,
  provide,
  nextTick
} from 'vue'
import { useIsMounted } from 'vooks'
import { useTheme } from '../../_mixins'
import NLoadingBar from './LoadingBar.vue'

export default defineComponent({
  name: 'LoadingBarProvider',
  props: {
    ...useTheme.props,
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  setup (props) {
    const isMountedRef = useIsMounted()
    const loadingBarRef = ref(null)
    const methods = {
      start () {
        if (isMountedRef.value) {
          loadingBarRef.value.start()
        } else {
          nextTick(() => {
            loadingBarRef.value.start()
          })
        }
      },
      error () {
        if (isMountedRef.value) {
          loadingBarRef.value.error()
        } else {
          nextTick(() => {
            loadingBarRef.value.error()
          })
        }
      },
      finish () {
        if (isMountedRef.value) {
          loadingBarRef.value.finish()
        } else {
          nextTick(() => {
            loadingBarRef.value.finish()
          })
        }
      },
      update (options) {
        const { percent } = options
        if (isMountedRef.value) {
          loadingBarRef.value.update(percent)
        } else {
          nextTick(() => {
            loadingBarRef.value.update(percent)
          })
        }
      }
    }
    provide('loadingBar', methods)
    provide('NLoadingBarProps', props)
    return {
      loadingBarRef,
      ...methods
    }
  },
  render () {
    return h(Fragment, null, [
      h(
        Teleport,
        {
          to: this.to ?? 'body'
        },
        [
          h(NLoadingBar, {
            ref: 'loadingBarRef'
          })
        ]
      ),
      this.$slots.default()
    ])
  }
})
