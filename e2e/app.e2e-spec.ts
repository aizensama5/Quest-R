import { QuestR.LocalPage } from './app.po';

describe('quest-r.local App', () => {
  let page: QuestR.LocalPage;

  beforeEach(() => {
    page = new QuestR.LocalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
