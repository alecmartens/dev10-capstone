package learn.capstone.models;

public enum ItemCategory {
    ART("ART"),
    BOOKS("BOOKS"),
    ELECTRONICS("ELECTRONICS"),
    CLOTHING("CLOTHING"),
    FURNITURE("FURNITURE"),
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
