
import javax.swing.*;
import java.awt.*;
import java.net.*;
import java.io.*;
import java.util.Scanner;
import org.json.JSONObject;

public class WeatherApp extends JFrame {
    private JTextField cityField;
    private JTextArea resultArea;

    public WeatherApp() {
        setTitle("Weather Information System");
        setSize(500, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        JPanel inputPanel = new JPanel();
        cityField = new JTextField(20);
        JButton getWeatherButton = new JButton("Get Weather");
        inputPanel.add(new JLabel("Enter City:"));
        inputPanel.add(cityField);
        inputPanel.add(getWeatherButton);

        resultArea = new JTextArea();
        resultArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(resultArea);

        add(inputPanel, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);

        getWeatherButton.addActionListener(e -> fetchWeather());

        setVisible(true);
    }

    private void fetchWeather() {
        String city = cityField.getText().trim();
        if (city.isEmpty()) {
            resultArea.setText("Please enter a city name.");
            return;
        }

        try {
            String urlString = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
                               "&appid=2f3f74117c18676f2f53b049959f7b16&units=metric";

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            Scanner sc = new Scanner(conn.getInputStream());
            StringBuilder inline = new StringBuilder();
            while (sc.hasNext()) {
                inline.append(sc.nextLine());
            }
            sc.close();

            JSONObject json = new JSONObject(inline.toString());
            String weather = json.getJSONArray("weather").getJSONObject(0).getString("main");
            String description = json.getJSONArray("weather").getJSONObject(0).getString("description");
            double temp = json.getJSONObject("main").getDouble("temp");
            int humidity = json.getJSONObject("main").getInt("humidity");
            double windSpeed = json.getJSONObject("wind").getDouble("speed");

            resultArea.setText("City: " + city + 
                "\nWeather: " + weather +
                "\nDescription: " + description +
                "\nTemperature: " + temp + "°C" +
                "\nHumidity: " + humidity + "%" +
                "\nWind Speed: " + windSpeed + " m/s");

        } catch (Exception ex) {
            resultArea.setText("Error fetching data. Please check the city name or your internet connection.");
        }
    }
}
