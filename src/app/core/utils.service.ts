// src/app/core/utils.service.ts
import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {
  constructor() {}

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

  displayCount(guests: number): string {
    // Example usage:
    //  attending this event
    const persons = guests === 1 ? " person" : " people";
    return guests + persons;
  }

  showPlusOnes(guests: number): string {
    // If bringing additional guest(s), show as "+n"
    if (guests) {
      return `+${guests}`;
    }
  }

  booleanToText(bool: boolean): string {
    // Change a boolean to 'Yes' or 'No' string
    return bool ? "Yes" : "No";
  }

  capitalize(str: string): string {
    // Capitalize first letter of string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
