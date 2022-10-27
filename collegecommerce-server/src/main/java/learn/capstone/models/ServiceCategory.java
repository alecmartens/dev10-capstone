package learn.capstone.models;

public enum ServiceCategory {
    REPAIR("REPAIR"),
    DELIVERY("DELIVERY"),
    PET_CARE("PET_CARE"),
    HOME_CLEANING("HOME_CLEANING"),
    TRANSPORTATION("TRANSPORTATION"),
    SHOPPING("SHOPPING"),
    DRIVING("DRIVING"),
    OTHER("OTHER");

    ServiceCategory(String name) {
        this.name = name;
    }

    private final String name;

    public String getName() {
        return name;
    }
}
