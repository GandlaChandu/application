namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.OWASPAdapter
{
    public static class OwaspZapApiConstants
    {
        public const string SpiderScanUrl = "/spider/action/scan";
        public const string SpiderStatusUrl = "/spider/view/status";
        public const string AjaxSpiderScanUrl = "/ajaxSpider/action/scan";
        public const string AjaxSpiderStatusUrl = "/ajaxSpider/view/status";
        public const string ActiveScanUrl = "/ascan/action/scan";
        public const string ActiveStatusUrl = "/ascan/view/status";
        public const string GetAlertsUrl = "/core/view/alerts";

        public const string GetScanPolicyNames = "/ascan/view/scanPolicyNames";
        public const string AddScanPolicy = "/ascan/action/addScanPolicy";
        public const string UpdateScanPolicy = "/ascan/action/updateScanPolicy";
        public const string GetPolicies = "/ascan/view/policies";
        public const string GetPoliciesByScanPolicyName = "/ascan/view/policies";
        public const string UpdatePolicyThreshold = "/ascan/action/setPolicyAlertThreshold";
        public const string UpdatePolicyStrength = "/ascan/action/setPolicyAttackStrength";
        public const string EnablePolicies = "/ascan/action/setEnabledPolicies";
        public const string GetScannersByPolicyId = "/ascan/view/scanners";
        public const string UpdateScannerThreshold = "/ascan/action/setScannerAlertThreshold";
        public const string UpdateScannerStrength = "/ascan/action/setScannerAttackStrength";
        public const string DeleteScanPolicy = "/ascan/action/removeScanPolicy";
        public const string UrlCountBySpiderScanId = "/spider/view/results";
    }
}
