//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { TicketingSystemInfoFormOwnPropModel } from './ticketing-system-info-own-prop.model';
import { TicketingSystemInfoFormDispatchPropModel } from './ticketing-system-info-form-dispatch-prop.model';
import { TicketingSystemInfoFormModel } from './ticketing-system-info-form.model';
import { ProjectState } from '../../project-store'

//#endregion application imports

export interface TicketingSystemInfoFormPropModel extends FormPropModel<TicketingSystemInfoFormModel>, TicketingSystemInfoFormOwnPropModel, TicketingSystemInfoFormDispatchPropModel, ProjectState {

}