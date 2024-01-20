<template>
  <v-container>
    <v-row style="justify-content: center;">
      <v-col cols="12" md="6" style="text-align: center;">
        <h1 style="color:#AED581;">{{ currentText }}</h1>
        <h1 style="color: rgb(125, 63, 36);">{{ currentTime }}</h1>
        <v-btn
          variant="text"
          icon="mdi-play"
          :disabled="status === STATUS.COUNTING || (currentItem.length === 0 && items.length === 0)"
          @click="startTimer"
        ></v-btn>
        <v-btn
          variant="text"
          icon="mdi-pause"
          :disabled="status !== STATUS.COUNTING"
          @click="pauseTimer"
        ></v-btn>
        <v-btn
          variant="text"
          icon="mdi-skip-next"
          :disabled="currentItem.length === 0"
        ></v-btn>

        <iframe
          style="border-radius:12px"
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX32smTEhlmrg?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </v-col>
      </v-row>

        <!-- 貼貼看 -->
        <v-row>
    <v-col cols="12">
      <v-sheet>
        <v-select
          v-model="weekday"
          :items="weekdays"
          dense
          variant="outlined"
          hide-details
          label="weekdays"
          class="ma-2"
        ></v-select>
      </v-sheet>
    </v-col>
    <v-col cols="12">
      <v-sheet>
        <v-calendar
          ref="calendar"
          v-model="today"
          :events="events"
          color="primary"
          type="week"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
  </v-container>
</template>

<script setup>
import { useListStore } from '@/store/list'
import { useSettingsStore } from '@/store/settings'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

const calendar = ref(null)
const weekday = ref([0, 1, 2, 3, 4, 5, 6])
const weekdays = ref([
  { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
  { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
  { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
  { title: 'Mon, Wed, Fri', value: [1, 3, 5] }
])
const events = [
  {
    title: 'Weekly Meeting',
    start: new Date('2019-01-07 09:00'),
    end: new Date('2019-01-07 10:00')
  },
  {
    title: 'Thomas\' Birthday',
    start: new Date('2019-01-10'),
    end: new Date('2019-01-10'),
    allDay: true
  },
  {
    title: 'Mash Potatoes',
    start: new Date('2019-01-09 12:30'),
    end: new Date('2019-01-09 15:30')
  }
]

const today = ref(new Date('2019-01-08'))

const list = useListStore()
const { currentItem, items, timeleft } = storeToRefs(list)
const { setCurrentItem, countdown, setFinishedItem } = list

const settings = useSettingsStore()
const { selectedAlarmFile } = storeToRefs(settings)

const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}

const status = ref(STATUS.STOP)

let timer = 0

const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  status.value = STATUS.COUNTING

  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()

  setFinishedItem()

  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  if (currentItem.value.length > 0) {
    return currentItem.value
  } else if (items.value.length > 0) {
    return '點擊開始'
  } else {
    return '沒有事項'
  }
})

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>

<script>
export default {
  data: () => ({
    today: '2019-01-08',
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { title: 'Mon, Wed, Fri', value: [1, 3, 5] }
    ],
    events: [
      {
        title: 'Weekly Meeting',
        start: new Date('2019-01-07 09:00'),
        end: new Date('2019-01-07 10:00')
      },
      {
        title: 'Thomas\' Birthday',
        start: new Date('2019-01-10'),
        end: new Date('2019-01-10'),
        allDay: true
      },
      {
        title: 'Mash Potatoes',
        start: new Date('2019-01-09 12:30'),
        end: new Date('2019-01-09 15:30')
      }
    ]
  })
}
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
