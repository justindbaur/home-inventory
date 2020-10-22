namespace HomeInventory.Shared.Entities
{
    public class UnitOfMeasureConversion
    {
        public int Id { get; set; }
        public string FromUOMName { get; set; }
        public UnitOfMeasure FromUOM { get; set; }
        public string ToUOMName { get; set; }
        public UnitOfMeasure ToUOM { get; set; }
        public float Value { get; set; } 
    }
}