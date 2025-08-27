# This module will handle special events based on Yua's status.

def check_events(yua):
    """
    Checks for and triggers events based on Yua's current status.

    Args:
        yua (Yua): The character object.
    """
    events_triggered = []

    # Event: Affection is high
    if yua.affection >= 50 and yua.affection < 80:
        events_triggered.append("ユアはあなたに微笑みかけている。「いつもありがとう」")

    # Event: Health is low
    if yua.health < 40:
        events_triggered.append("ユアは少し顔色が悪いようだ...")

    # Special Event: High affection and good health
    if yua.affection >= 80 and yua.health >= 90:
        events_triggered.append("特別イベント：ユアはとても嬉しそうだ。「あなたといると、不思議と元気が出るの」")

    if not events_triggered:
        print("特に変わったことはない。")
    else:
        for event in events_triggered:
            print(f"イベント: {event}")
