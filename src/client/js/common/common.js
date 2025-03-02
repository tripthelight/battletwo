import '@/client/assets/scss/common';
import '@/client/js/module/networkCheck';
import storageEvent from '@/client/js/module/storage/storageEvent';
import '@/client/js/module/browserLang';
import { setInnerHeight } from "@/client/js/module/appHeight";
import { deviceCheck } from "@/client/js/module/deviceCheck";
import '@/client/js/common/resize';

storageEvent();

setInnerHeight();
deviceCheck();
