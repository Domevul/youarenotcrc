from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Navigate to the app
            page.goto("http://localhost:5173/youarenotcrc/", timeout=60000)
            page.wait_for_load_state('networkidle')

            # 2. Start the game
            start_button = page.get_by_role("button", name="はじめる")
            expect(start_button).to_be_visible()
            start_button.click()

            # 3. Click through the prologue
            # 3. Click through the prologue by clicking the overlay
            story_overlay = page.locator('.story-dialog-overlay')
            while story_overlay.is_visible():
                story_overlay.click()
                page.wait_for_timeout(500) # Wait for fade out/in animation

            # Wait for the story dialog to be fully gone.
            expect(story_overlay).to_be_hidden(timeout=10000)

            # Wait for the main game screen to be visible
            expect(page.get_by_text("アクションを選択")).to_be_visible(timeout=10000)

            # 4. Click the admin button to get 100 data
            admin_button = page.get_by_role("button", name="標準プロトコル投与 ($30,000)")
            expect(admin_button).to_be_visible()
            admin_button.click()

            # 5. Click the button to go to phase 2
            phase2_button = page.get_by_role("button", name="フェーズ2に進む")
            expect(phase2_button).to_be_visible(timeout=10000)
            phase2_button.click()

            # 6. Take a screenshot of the game screen
            # Wait for the grid to be visible
            expect(page.get_by_text("YUA").first).to_be_visible()
            expect(page.get_by_text("MAI").first).to_be_visible()

            page.screenshot(path="jules-scratch/verification/phase2_grid.png")
            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()
