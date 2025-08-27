from yua import Yua
from events import check_events

def main():
    """
    Main function to run the interactive story with Yua.
    """
    player_name = input("あなたの名前を入力してください: ")
    yua = Yua()

    print(f"\n{player_name}は実験室でユアと出会った。")
    print("これからユアとのコミュニケーションを開始します。")

    while True:
        print("\n" + "="*30)
        print(yua.get_status())
        print("="*30)

        # Check for events at the beginning of each turn
        check_events(yua)

        print("\nどうしますか？")
        print("1: ユアと話す")
        print("2: プレゼントを渡す（体調が少し回復し、好感度が上がる）")
        print("3: 何もしない（ユアの体調が少し悪化する）")
        print("4: 終了する")

        choice = input("選択肢を番号で入力してください: ")

        if choice == '1':
            print(f"\n{player_name}はユアと少し話した。")
            yua.change_affection(10)
        elif choice == '2':
            print(f"\n{player_name}はユアにプレゼントを渡した。")
            yua.change_health(5)
            yua.change_affection(20)
        elif choice == '3':
            print(f"\n{player_name}は何もせず、時間が過ぎた。")
            yua.change_health(-5)
        elif choice == '4':
            print("\nコミュニケーションを終了します。")
            break
        else:
            print("\n無効な選択です。もう一度選んでください。")

if __name__ == "__main__":
    main()
