namespace Inadlaw.Models
{
    public class TodoItem
    {
        /**
         * In spring boot , theres annotation to make it autoincrement
         * here its automatic , but explicit its ok too
         * 
         *      [Key]
         *      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
         */
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }


    }
}
