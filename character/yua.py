class Yua:
    """
    Represents the character Yua, with her own stats.
    """
    def __init__(self, name="ユア"):
        """
        Initializes a new instance of the Yua class.

        Args:
            name (str): The name of the character.
        """
        self.name = name
        self.health = 100  # 体調 (Initial value: 100)
        self.affection = 0  # 好感度 (Initial value: 0)

    def change_health(self, amount):
        """
        Changes the character's health by a given amount.

        Args:
            amount (int): The amount to change the health by (can be negative).
        """
        self.health += amount
        # Ensure health doesn't go below 0 or above a max value, e.g., 100
        if self.health < 0:
            self.health = 0
        elif self.health > 100:
            self.health = 100
        print(f"{self.name}の体調が{amount}変化した。現在の体調: {self.health}")

    def change_affection(self, amount):
        """
        Changes the character's affection level by a given amount.

        Args:
            amount (int): The amount to change the affection by (can be negative).
        """
        self.affection += amount
        print(f"{self.name}の好感度が{amount}変化した。現在の好感度: {self.affection}")

    def get_status(self):
        """
        Returns a string with the character's current status.
        """
        return f"名前: {self.name}, 体調: {self.health}, 好感度: {self.affection}"
