// 首頁跟設定頁都需要用到此設定
// 從pinia這個套件引用defineStore語法
import { defineStore } from 'pinia'
// 欲保存的資料名稱是settings 用useSettingsStore 輸出出去
export const useSettingsStore = defineStore('settings', {
  // state: () => (此小括號代表return 原本要寫成：
//   state: () => {
//     return {
//       alarms: [],
//       selectedAlarm: 1
//     }
//   }
// })
  state: () => ({
    // 有哪些鈴聲
    alarms: [
      { id: 1, name: '鬧鐘', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
      { id: 2, name: 'Yay', file: new URL('@/assets/yay.mp3', import.meta.url).href }
    ],
    // 目前選的是哪個
    selectedAlarm: 1
  }),

  getters: {
    selectedAlarmFile () {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarm)
      return this.alarms[i].file
    }
  }
})
// 在你提供的 Vue.js Pinia store 文件中，有一个 `getters` 部分，其中定义了一个名为 `selectedAlarmFile` 的 getter 方法。让我解释一下这段代码：x` 

// 这个 getter 方法名为 `selectedAlarmFile`，它用于获取当前选定的闹钟对应的音频文件的路径。

// 解释如下：

// - `selectedAlarmFile` 是 getter 的名称，你可以在组件中通过 `$store.getters.selectedAlarmFile` 来访问这个 getter。

// - 在 getter 方法内部，`this.alarms` 表示 store 中的 `alarms` 数组，该数组包含了不同的闹钟对象，每个对象包括 `id`、`name` 和 `file`。

// - `this.selectedAlarm` 表示 store 中的 `selectedAlarm` 属性，它是当前选定的闹钟的 `id`。

// - `const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarm)` 通过 `findIndex` 方法找到与当前选定的闹钟 `id` 相匹配的索引 `i`。

// - 最后，`return this.alarms[i].file` 返回与选定的闹钟相对应的音频文件路径。

// 这个 getter 的作用是，当你在组件中需要获取当前选定闹钟的音频文件路径时，可以直接调用 `this.$store.getters.selectedAlarmFile`。这样的分离使得逻辑更清晰，组件只需关注获取数据而不必关心具体实现细节。
