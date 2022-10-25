namespace Com.ACSCorp.Accelerator.Core.Models
{
    public class ListItem<T>
    {
        public string Text { get; set; }
        public T Value { get; set; }
    }
}