import {DispatchHub} from './dispatch-hub.entity';
import {DispatchOrder} from './dispatch-order.entity';

/**
 * Read model that summarizes the dispatch orders and tonnage of a dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHubSummary {
  /**
   * Dispatch orders that belong to the hub, most recent first.
   */
  readonly orders: DispatchOrder[];

  /**
   * Creates a summary for a dispatch hub.
   *
   * @param dispatchHub - The summarized dispatch hub.
   * @param dispatchOrders - Dispatch orders; only the ones of this hub are considered.
   */
  constructor(readonly dispatchHub: DispatchHub, dispatchOrders: DispatchOrder[]) {
    this.orders = dispatchOrders
      .filter(order => order.dispatchHubId === dispatchHub.id)
      .sort((a, b) => b.dispatchedAt.getTime() - a.dispatchedAt.getTime());
  }

  /**
   * True when no dispatch orders were registered for the hub.
   */
  get isEmpty(): boolean {
    return this.orders.length === 0;
  }

  /**
   * Sum of the assigned tonnage of every order of the hub.
   */
  get totalDispatchedTonnage(): number {
    return this.orders.reduce((total, order) => total + order.assignedTonnage, 0);
  }

  /**
   * Maximum tonnage of the hub minus the total dispatched tonnage.
   */
  get availableTonnageCapacity(): number {
    return this.dispatchHub.maxTonnage - this.totalDispatchedTonnage;
  }

  /**
   * Checks whether a new order with the given tonnage can be dispatched.
   * @param assignedTonnage - Tonnage of the new order.
   * @returns True when it is greater than zero and not above the available tonnage capacity.
   */
  canDispatch(assignedTonnage: number): boolean {
    return assignedTonnage > 0 && assignedTonnage <= this.availableTonnageCapacity;
  }
}
