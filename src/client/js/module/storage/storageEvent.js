import consoleLocalStorage from "@/client/js/module/storage/console/consoleLocalStorage";
import consoleSessionStorage from "@/client/js/module/storage/console/consoleSessionStorage";
import applicationLocalStorage from "@/client/js/module/storage/application/applicationLocalStorage";

export default function storageEvent() {
  consoleLocalStorage();
  consoleSessionStorage();
  applicationLocalStorage();
}
