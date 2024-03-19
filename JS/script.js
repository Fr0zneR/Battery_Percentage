initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
          batteryStatus = document.querySelector('.battery__status'),
          batteryPercentage = document.querySelector('.battery__percentage')

    navigator.getBattery().then((batt) => {
        updateBattery = () =>{
            /* First we need to update battery percentage */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level+ '%'

            // now we update the background level of battery
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            // now we validate full, low, and if its charging battery levels
            if(level = 100){ /* When full */
                batteryStatus.innerHTML = `Full Battery <i class="fa-solid fa-battery-full green-color"></i>`
                batteryLiquid.style.height = `103%` /* to hide elapse */
            }
            else if(level <= 20 &! batt.charging){ /* when battery charging and low */
                batteryStatus.innerHTML = `Low Battery <i class="fa-solid fa-plug-circle-bolt animated-red"></i>`
            }
            else if(batt.charging){ /* when charging */
                batteryStatus.innerHTML = `Charging... <i class="fa-solid fa-bolt animated-green"></i>`
            }
            else{ /* when its not loading */
                batteryStatus.innerHTML = ''
            }

            // Change color of battery and replace it with previous color
            if(level <= 20){
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange','gradient-color-yellow','gradient-color-green')
            }
            else if (level <= 40){
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-yellow','gradient-color-green')
            }
            else if (level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-yellow')
            }
        }
        updateBattery()

        // Battery Status Events
        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})
    })
}