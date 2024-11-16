export enum EVChargerStatus {
  Available = 1, // Available state (not plugged in)
  Preparing = 2, // Preparing state of insertion (plugged in and not activated)
  Charging = 3, // Charging state (charging with power output)
  SuspendedEVSE = 4, // Suspended at the terminal (already started but no available power)
  SuspendedEV = 5, // Suspended at the vehicle end (with available power, waiting for the car to respond)
  Finishing = 6, // Finishing the charging end state (actively swiping the card to stop or EMS stop control)
  Faulted = 9, // Faulted fault state (pile failure)
}

export enum EVChargerControlMode {
  StopCharging = 0, // Stop charging
  StartCharging = 1, // Start charging
}
