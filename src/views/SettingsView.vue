<template>
    <v-container>
      <v-row>
        <v-col cols="12">
        <h1 class="text-center" style="color:#AED581;">鈴聲設定</h1>
        </v-col>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th>名稱</th>
                <th>試聽</th>
                <th>選擇</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alarm in alarms" :key="alarm.id">
                <td>{{ alarm.name }}</td>
                <td>
                  <!--controls為瀏覽器內建ui  -->
                  <audio :src="alarm.file" controls></audio>
                </td>
                <td>
                  <!-- 交由外部v-model修改狀態 -->
                  <v-radio-group v-model="selectedAlarm">
                    <v-radio :value="alarm.id"></v-radio>
                  </v-radio-group>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
// 把store setings的設定引入表格
import { useSettingsStore } from '@/store/settings'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()
const { alarms, selectedAlarm } = storeToRefs(settings)
</script>
