﻿using Newtonsoft.Json;


namespace Com.ACSCorp.Accelerator.Core.Models
{
    public class ExceptionDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
