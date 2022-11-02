package learn.capstone.models;

public enum ItemCategory {
    APPLICANCES("APPLICANCES"),
    ART("ART"),
    BOOKS("BOOKS"),
    ELECTRONICS("ELECTRONICS"),
    CLOTHING("CLOTHING"),
    GROCERY("GROCERY"),
    PET("PET"),
    SCHOOL("SCHOOL"),
    SPORTS("SPORTS"),
    TOYS("TOYS"),
    OTHER("OTHER");

    ItemCategory(String name) {
        this.name = name;
    }

    private final String name;

    public String getName() {
        return name;
    }
}
