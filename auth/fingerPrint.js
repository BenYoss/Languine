import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fingerPrintPromise = FingerprintJS.load();

(async () => {
  const fingerPrint = await fingerPrintPromise;
  const result = await fingerPrint.get();

  const userId = result.visitorId;
})();
