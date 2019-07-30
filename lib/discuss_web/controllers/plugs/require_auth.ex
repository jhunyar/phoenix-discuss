defmodule Discuss.Plugs.RequireAuth do
  import Plug.Conn
  import Phoenix.Controller
<<<<<<< HEAD

=======
  
>>>>>>> 871c75462ae086e7ea74933b2dee59f4d490f185
  alias DiscussWeb.Router.Helpers

  def init(_params) do
  end

  def call(conn, _params) do
    if conn.assigns[:user] do
      conn
    else
      conn
      |> put_flash(:error, "You must be logged in.")
      |> redirect(to: Helpers.topic_path(conn, :index))
      |> halt()
    end
  end
end
