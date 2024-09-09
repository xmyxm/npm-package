import { getUrlParam } from '../util/tools';
const report = getUrlParam('report') === "true" || false;
if (report) {
  window.Fish.init({ debug: true })
}
