// 传入电器type返回电器信息
export function getDeviceInfo (type) {
  type = type - 0;
  switch (type) {
    case 0:
      return {
        name: '一路开关',
        icon: 'icon-socket'
      };
    case 1:
      return {
        name: '二路开关',
        icon: 'icon-socket'
      };
    case 2:
      return {
        name: '三路开关',
        icon: 'icon-socket'
      };
    case 3:
      return {
        name: '4路开关',
        icon: 'icon-socket'
      };
    case 4:
      return {
        name: '空开插座',
        icon: 'icon-swich'
      }
    case 5:
      return {
        name: '中央空调',
        icon: 'icon-air'
      }
    case 6:
      return {
        name: '温湿器',
        icon: 'icon-hygrothermoscope'
      };
    case 7:
      return {
        name: '开关柜采集器',
        icon: 'icon-swich'
      };
    case 8:
      return {
        name: '光感应',
        icon: 'icon-light'
      };
    case 9:
      return {
        name: '人体感应',
        icon: 'icon-person-induction'
      };
    case 10:
      return {
        name: '红外转发',
        icon: 'icon-infrared-forward'
      };
    case 11:
      return {
        name: '插座',
        icon: 'icon-socket'
      };
    case 12:
      return {
        name: '窗帘开关',
        icon: 'icon-window2'
      };
    case 13:
      return {
        name: '调光开关',
        icon: 'icon-light-swich'
      };
    case 14:
      return {
        name: '窗帘电机',
        icon: 'icon-window1'
      };
    case 15:
      return {
        name: '门磁',
        icon: 'icon-gsm'
      };
    case 16:
      return {
        name: '燃气探测器',
        icon: 'icon-rqtc'
      };
    case 17:
      return {
        name: '烟雾',
        icon: 'icon-smog'
      };
    case 18:
      return {
        name: '紧急按钮',
        icon: 'icon-urgent-bt'
      };
    case 19:
      return {
        name: '溢水探测器',
        icon: 'icon-Overflow-sensor'
      };
    case 20:
      return {
        name: '球泡灯',
        icon: 'icon-bulb'
      };
    case 21:
      return {
        name: '报警板',
        icon: 'icon-alarm-board'
      };
    case 22:
      return {
        name: '窗帘电机百叶',
        icon: 'icon-window2'
      };
    case 23:
      return {
        name: '周届',
        icon: 'icon-bulb'
      };
    case 24:
      return {
        name: 'Zigbee插座',
        icon: 'icon-socket'
      };
    case 25:
      return {
        name: '投影仪',
        icon: 'icon-projector'
      };
    case 26:
      return {
        name: '电视',
        icon: 'icon-TV'
      };
    case 27:
      return {
        name: '网络盒子',
        icon: 'icon-Netbox'
      };
    case 28:
      return {
        name: '红外空调',
        icon: 'icon-infrared-air'
      };
    case 29:
      return {
        name: '指纹门锁',
        icon: 'icon-window1'
      };
    case 30:
      return {
        name: '温度传感器',
        icon: 'icon-window1'
      };
    case 31:
      return {
        name: '开关柜',
        icon: 'icon-window1'
      };
    default:
      return {
        name: '--',
        icon: '--'
      }
  }
}
