namespace HomeInventory.Shared.Dtos
{
    public class EditItemDto
    {
        public string Name { get; set; }
        public double Quantity { get; set; }
        public string Location { get; set; }
        public double Size { get; set; }
        public string UOM { get; set; }
    }
}